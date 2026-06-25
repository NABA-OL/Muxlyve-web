"use server";

import { releaseDevice, findLicense } from "@/lib/licenses";
import { sendLicenseEmail } from "@/lib/email";
import { redirect } from "next/navigation";

export async function releaseDeviceAction(formData: FormData) {
  const key = formData.get("key") as string;
  const machineId = formData.get("machineId") as string;
  if (!key || !machineId) return;
  await releaseDevice(key, machineId);
  redirect(`/gestionar-licencia?key=${encodeURIComponent(key)}&released=1`);
}

export async function resendEmailAction(formData: FormData) {
  const key = formData.get("key") as string;
  if (!key) return;
  const license = await findLicense(key);
  if (license?.email) {
    await sendLicenseEmail(license.email, key).catch(() => {});
  }
  redirect(`/gestionar-licencia?key=${encodeURIComponent(key)}&sent=1`);
}
