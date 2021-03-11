from .types import (
    OptionType,
    AnswerType,
    QuestionTypeType,
    SurveyType,
    QuestionType,
)
from .resolvers import (
    OptionResolvers,
    QuestionTypeResolvers,
    SurveyResolvers,
    QuestionResolvers,
    AnswerResolvers,
)

from .mutations.questions import (
    CreateQuestion, CreateUpdateAndDeleteOptions, DeleteAnswersToSurvey,
    UpdateQuestion,
    DeleteQuestion,
    CreateQuestionType,
    UpdateQuestionType,
    DeleteQuestionType,
    CreateAnswer,
    UpdateAnswer,
    DeleteAnswer,
    SubmitOrUpdateAnswers
)

from .mutations.surveys import (
    CreateSurvey,
    UpdateSurvey,
    DeleteSurvey,
)


import graphene


class SurveyQueries(
    graphene.ObjectType,
    OptionResolvers,
    QuestionTypeResolvers,
    SurveyResolvers,
    QuestionResolvers,
    AnswerResolvers
):
    option = graphene.Field(OptionType, id=graphene.ID())
    options = graphene.List(OptionType, search=graphene.String())

    question_type = graphene.Field(QuestionTypeType, id=graphene.ID())
    question_types = graphene.List(QuestionTypeType, search=graphene.String())

    survey = graphene.Field(SurveyType, survey_id=graphene.ID())
    surveys = graphene.List(SurveyType, search=graphene.String())

    question = graphene.Field(QuestionType, id=graphene.ID())
    questions = graphene.List(QuestionType, search=graphene.String())

    answer = graphene.Field(AnswerType, id=graphene.ID())
    answers = graphene.List(AnswerType, search=graphene.String())

class SurveyMutations(graphene.ObjectType):
    create_question = CreateQuestion.Field()
    update_question = UpdateQuestion.Field()
    delete_question = DeleteQuestion.Field()

    create_question_type = CreateQuestionType.Field()
    update_question_type = UpdateQuestionType.Field()
    delete_question_type = DeleteQuestionType.Field()

    create_survey = CreateSurvey.Field()
    update_survey = UpdateSurvey.Field()
    delete_survey = DeleteSurvey.Field()

    create_answer = CreateAnswer.Field()
    update_answer = UpdateAnswer.Field()
    delete_answer = DeleteAnswer.Field()

    submit_answers = SubmitOrUpdateAnswers.Field()
    delete_answers = DeleteAnswersToSurvey.Field()

    create_update_and_delete_options = CreateUpdateAndDeleteOptions.Field()