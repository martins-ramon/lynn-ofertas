import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'model-context');
const output = resolve(root, 'public', 'media');
await mkdir(output, { recursive: true });

// Explicit allowlist: only the brand assets and product screenshots provided for
// the experience are published. Source PDFs and transcripts stay out of dist.
const brands = [
  ['foundation_lynn_logo.png', 'lynn-logo.webp', false],
  ['totvs-logo_black.png', 'totvs-dark.webp', true],
  ['totvs-logo-transparente.png', 'totvs-light.webp', true],
];
for (const [input, name, trim] of brands) {
  let image = sharp(resolve(source, input));
  if (trim) image = image.trim(); // Remove transparent padding, preserve artwork.
  const result = await image.webp({ lossless: true }).toFile(resolve(output, name));
  console.log(`${name}: ${result.width}×${result.height}, ${Math.round(result.size / 1024)} KB`);
}

await sharp(resolve(source, 'foundation_lynn_logo.png'))
  .extract({ left: 0, top: 0, width: 272, height: 272 })
  .resize(64, 64)
  .png()
  .toFile(resolve(output, 'lynn-icon.png'));

const screens = [
  ['lynn_foundation_admin_agentes.png', 'admin-agents'],
  ['lynn_foundation_admin_agente_detalhes.png', 'admin-details'],
  ['lynn_foundation_builder_agente_prompt.png', 'builder-prompt'],
  ['lynn_foundation_builder_agente_diagrama.png', 'builder-diagram'],
  ['lynn_foundation_builder_agente_manifesto.png', 'builder-manifest'],
  ['lynn_foundation_enterprise_layer_agente_conversacional.png', 'enterprise-conversation'],
  ['lynn_foundation_enterprise_layer_lista_agentes_e_acoes_realizadas.png', 'enterprise-tasks'],
  ['lynn_garden_conexoes.png', 'garden-connections'],
  ['lynn_garden_agentes_criacao.png', 'garden-create'],
  ['lynn_garden_agentes_do_usuario.png', 'garden-agents'],
  ['lynn_garden_chat.png', 'garden-chat'],
];
for (const [input, name] of screens) {
  const image = sharp(resolve(source, input));
  const full = await image.clone().webp({ quality: 92, effort: 6 }).toFile(resolve(output, `${name}.webp`));
  await image.clone().resize({ width: 1120, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(resolve(output, `${name}-preview.webp`));
  console.log(`${name}: ${full.width}×${full.height}, ${Math.round(full.size / 1024)} KB`);
}
