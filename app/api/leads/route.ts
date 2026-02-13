import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/leads — public endpoint for contact form submissions
export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, projectType, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        projectType: projectType?.trim() || null,
        message: message.trim(),
      },
    });

    // Also create an admin notification
    prisma.notification.create({
      data: {
        type: "new_lead",
        message: `New enquiry from ${name.trim()} (${projectType || "General"})`,
      },
    }).catch(() => {});

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
