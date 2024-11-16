// server/utils/promptTemplates.js

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
  } = storyDetails;

  return `
You are the Author Agent. Write the first chapter of the story.

Story Details:
- Title: ${title}
- Theme: ${theme}
- Genre: ${genre}
- Setting: ${setting}
- Point of View: ${pov}
- Tone: ${tone}
- Target Audience: ${audience}

Character Profiles:
${characterProfiles}

Plot Points:
${plotPoints}

Instructions:
- Write in the style appropriate for the target audience.
- Ensure consistency in tone and style.
- Follow the plot points closely.
- Incorporate character details as provided.
  `;
}

module.exports = { generateAuthorPrompt };