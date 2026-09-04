import { defaultLocale, getIntlayer, Locales } from "intlayer";
import { z } from "zod";

import { buildCreateFleetSchema } from "@/components/create-fleet-modal/lib/schema";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

const SUPPORTED_LOCALES = [Locales.FRENCH, Locales.ENGLISH] as const;

const resolveLocale = (raw: string | null) =>
  SUPPORTED_LOCALES.find((locale) => String(locale) === raw) ?? defaultLocale;

const SELECT = {
  id: true,
  title: true,
  description: true,
  color: true,
  companiesCount: true,
  createdAt: true,
} as const;

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;

    const cursor = params.get("cursor") ?? undefined;
    const limitParam = params.get("limit");
    const rawLimit = limitParam ? Number(limitParam) : NaN;
    const limit =
      Number.isFinite(rawLimit) && rawLimit >= 1
        ? Math.min(Math.trunc(rawLimit), MAX_LIMIT)
        : DEFAULT_LIMIT;

    const rows = await prisma.fleet.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: SELECT,
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return Response.json({ items, nextCursor });
  } catch (error) {
    console.error("[GET /api/fleets]", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (body === null || typeof body !== "object") {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const locale = resolveLocale(request.headers.get("x-locale"));
    const { validation } = getIntlayer("create-fleet", locale);
    const schema = buildCreateFleetSchema({
      nameRequired: validation.nameRequired,
      nameMax: validation.nameMax,
      descriptionMax: validation.descriptionMax,
    });

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const { fieldErrors } = z.flattenError(parsed.error);
      return Response.json({ errors: fieldErrors }, { status: 400 });
    }

    const { name, description, color } = parsed.data;

    const fleet = await prisma.fleet.create({
      data: {
        title: name,
        description: description && description.length > 0 ? description : null,
        color,
        companiesCount: 0,
      },
      select: SELECT,
    });

    return Response.json(fleet, { status: 201 });
  } catch (error) {
    console.error("[POST /api/fleets]", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
