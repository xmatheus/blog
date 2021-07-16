// Processador para parsear markdown
import remark from "remark";
// Serializador de markdown para string
import html from "remark-html";

export async function toHTML(markdown) {
  // Processamos nosso conteúdo Markdown
  const result = await remark().use(html).process(markdown);

  return result.toString();
}

export default { toHTML };
