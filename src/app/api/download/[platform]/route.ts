import { type NextRequest, NextResponse } from "next/server";

const REPO = process.env.GITHUB_REPO ?? "tu-usuario/Muxlyve";
const RELEASES_PAGE = `https://github.com/${REPO}/releases`;

const ASSET_PATTERN: Record<string, RegExp> = {
  win: /\.exe$/i,
  mac: /\.(dmg|pkg)$/i,
};

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubAsset[];
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const pattern = ASSET_PATTERN[platform];

  if (!pattern) {
    return NextResponse.json({ error: "Plataforma no soportada" }, { status: 400 });
  }

  const fallback = NextResponse.redirect(RELEASES_PAGE, { status: 302 });

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      { headers, next: { revalidate: 300 } },
    );

    if (!res.ok) return fallback;

    const release: GitHubRelease = await res.json();
    const asset = release.assets?.find((a) => pattern.test(a.name));

    if (!asset) return fallback;

    return NextResponse.redirect(asset.browser_download_url, { status: 302 });
  } catch {
    return fallback;
  }
}
