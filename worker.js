export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    const body = await request.json();
    const { filename, content } = body;

    if (!filename || !content) {
      return new Response("Missing filename or content", { status: 400 });
    }

    const GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"; // ← توکن را اینجا بگذار
    const owner = "fordriveaf-hue";
    const repo = "fizikT";

    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/files/${filename}`;

    const res = await fetch(githubUrl, {
      method: "PUT",
      headers: {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "upload file",
        content: content
      })
    });

    const data = await res.text();
    return new Response(data, { status: res.status });
  }
};
