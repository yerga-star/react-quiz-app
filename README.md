
# react-quiz-app
## Question Component

The **Question** component is responsible for rendering a single quiz question along with its answer choices. Each question is displayed with its available options, and users can select their answers. Here's a closer look at this component:

### Component Overview

The **Question** component receives the following props:

- `question`: The text of the question.
- `allAnswer`: An array of answer objects containing the answer text, ID, and selection status.
- `quizCompleted`: A boolean indicating whether the quiz has been completed.
- `quizId`: The unique ID of the quiz question.
- `onSelected`: A callback function to handle user answer selections.

### Rendering Answer Choices

The component maps over the `allAnswer` prop to render each answer choice as a clickable div element. When an answer is clicked, the `onSelected` callback is triggered to update the user's selected answers. The background color of the selected answer is changed to provide visual feedback.

### Conditional Styling

The background color of each answer choice is conditionally styled based on whether it's selected by the user. When an answer is selected, its background color is changed to a light blue (#D6DBF5) to differentiate it from other options.

## Getting Started

Follow these steps to set up and run the **My Quiz Page** application on your local machine:

1. Clone this repository: `git clone https://github.com/your-username/my-quiz-page.git`
2. Navigate to the project directory: `cd my-quiz-page`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your web browser and go to: `http://localhost:3000`

## Usage

1. Select a quiz category and difficulty level from the dropdowns.
2. Click the "Start Quiz" button to begin the quiz.
3. Answer the questions by selecting the correct options.
4. Navigate between question pages using the "Prev" and "Next" buttons.
5. On the last page, click "Check Answers" to submit your quiz for scoring.
6. View your score and optionally start a new quiz.

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "Add your commit message"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to personalize this README template further with any additional details about the **Question** component or any other aspect of your project that you'd like to highlight. Remember that a well-structured and informative README will help potential users and contributors understand and engage with your project effectively. Happy coding!
