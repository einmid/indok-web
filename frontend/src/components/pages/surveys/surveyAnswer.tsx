import { useQuery, useMutation } from "@apollo/client";
import { SURVEY } from "@graphql/surveys/queries";
import { Survey, Answer } from "@interfaces/surveys";
import QuestionAnswer from "@components/pages/surveys/questionAnswer";
import { Typography } from "@material-ui/core";
import { useState } from "react";
import { CREATE_ANSWER } from "@graphql/surveys/mutations";

const SurveyAnswer: React.FC<{ surveyId: string }> = ({ surveyId }) => {
  const [answers, setAnswers] = useState<Answer[]>();
  const { error, loading, data } = useQuery<{ survey: Survey }>(SURVEY, {
    variables: { ID: Number(surveyId) },
    onCompleted({ survey }) {
      if (survey) {
        setAnswers(survey.questions.map((question) => ({ id: "", answer: "", question: question })));
      }
    },
  });
  const [createAnswer] = useMutation(CREATE_ANSWER);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      {data && (
        <>
          <Typography variant="h1" component="h1">
            {data.survey.descriptiveName}
          </Typography>
          {answers && (
            <>
              {answers.map((answer, index) => (
                <li key={index}>
                  <QuestionAnswer
                    answer={answer}
                    setAnswer={(newAnswer: Answer) =>
                      setAnswers(
                        answers.map((oldAnswer) => (oldAnswer.question === newAnswer.question ? newAnswer : oldAnswer))
                      )
                    }
                  />
                </li>
              ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  createAnswer({ variables: { questionId: answers[0].question.id, answer: answers[0].answer } });
                }}
              >
                Søk
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SurveyAnswer;
