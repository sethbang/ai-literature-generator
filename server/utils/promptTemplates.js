// server/utils/promptTemplates.js

function generateOutlinePrompt(storyDetails) {
  const { title, theme, genre, setting, characterProfiles, plotPoints } = storyDetails;

  let prompt = `
You are the Outline Builder Agent. Create a detailed outline for a story with the following details:

- Title: ${title}
- Theme: ${theme}
- Genre: ${genre}
- Setting: ${setting}
`;

  if (characterProfiles && characterProfiles.trim() !== '') {
    prompt += `\nCharacter Profiles:\n${characterProfiles}\n`;
  }

  if (plotPoints && plotPoints.trim() !== '') {
    prompt += `\nPlot Points:\n${plotPoints}\n`;
  }

  prompt += `
Instructions:
- Provide a chapter-by-chapter breakdown.
- Highlight key events and character developments.
  `;

  return prompt;
}

function generateAuthorPrompt(storyDetails) {
  const {
    title,
    theme,
    genre,
    setting,
    pov,
    tone,
    audience,
    characterProfiles,
    plotPoints,
    outline,
  } = storyDetails;

  let prompt = `
You are the Author Agent. Write the first chapter of the story based on the outline provided.

Story Details:
- Title: ${title}
- Theme: ${theme}
- Genre: ${genre}
- Setting: ${setting}
`;

  if (pov && pov.trim() !== '') {
    prompt += `- Point of View: ${pov}\n`;
  }

  if (tone && tone.trim() !== '') {
    prompt += `- Tone: ${tone}\n`;
  }

  if (audience && audience.trim() !== '') {
    prompt += `- Target Audience: ${audience}\n`;
  }

  prompt += `\nOutline:\n${outline}\n`;

  if (characterProfiles && characterProfiles.trim() !== '') {
    prompt += `\nCharacter Profiles:\n${characterProfiles}\n`;
  }

  if (plotPoints && plotPoints.trim() !== '') {
    prompt += `\nPlot Points:\n${plotPoints}\n`;
  }

  prompt += `
Instructions:
- Write in the style appropriate for the target audience.
- Ensure consistency in tone and style.
- Follow the outline closely.
`;

  if (characterProfiles && characterProfiles.trim() !== '') {
    prompt += `- Incorporate character details as provided.\n`;
  }

  return prompt;
}

function generateEditorPrompt(draft) {
  return `
You are the Editor Agent. Review the following draft and suggest improvements:

Draft:
${draft}

Instructions:
- Look for inconsistencies in plot or character behavior.
- Suggest enhancements to dialogue and descriptions.
- Provide constructive feedback without rewriting the draft.
  `;
}

module.exports = {
  generateOutlinePrompt,
  generateAuthorPrompt,
  generateEditorPrompt,
};