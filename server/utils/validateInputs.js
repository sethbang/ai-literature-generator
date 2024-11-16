// server/utils/validateInputs.js

function validateStoryInputs(storyDetails) {
    const errors = [];

    if (!storyDetails.title || storyDetails.title.trim() === '') {
        errors.push('Title is required.');
    }

    // Add other validation checks as needed

    return errors;
}

module.exports = { validateStoryInputs };