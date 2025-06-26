import { useFormik } from "formik"
import { useState } from "react"
import TextEditor from "../TextEditor"
import GlobalInput from "../Form/GlobalInput"
import { X, Loader2 } from "lucide-react"
import type { Question, SourceItem } from "../../types/types"
import SourcesManager from "../SourcesManager"
import formatFileSize from "../../constants/FileSize"

const QnATab = () => {
  const [questions, setQuestions] = useState<Question[]>([{ id: "main", value: "" }])
  const [qnaSources, setQnaSources] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: "",
      questions: [""],
      answer: "",
    },
    validate: (values) => {
      const errors: {
        title?: string
        questions?: (string | undefined)[]
        answer?: string
      } = {}

      if (values.title.length > 30) {
        errors.title = "Title cannot exceed 30 characters"
      }

      const questionErrors: (string | undefined)[] = []
      let hasQuestionError = false

      values.questions.forEach((question, index) => {
        if (!question.trim()) {
          questionErrors[index] = "Question is required"
          hasQuestionError = true
        } else if (question.length > 100) {
          questionErrors[index] = "Question cannot exceed 100 characters"
          hasQuestionError = true
        }
      })

      if (hasQuestionError) {
        errors.questions = questionErrors
      }

      if (!values.answer.trim()) {
        errors.answer = "Answer is required"
      }

      return errors
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newQna = {
        id: Math.random().toString(36).substr(2, 9),
        title: values.title,
        questions: [...values.questions],
        answer: values.answer,
        isNew: false,
      }
      setQnaSources(prev => [...prev, newQna])
      resetForm()
      setQuestions([{ id: "main", value: "" }])
      setIsLoading(false)
    },
  })

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      value: "",
    }
    setQuestions([...questions, newQuestion])
    formik.setFieldValue("questions", [...formik.values.questions, ""])
  }

  const removeQuestion = (indexToRemove: number) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, index) => index !== indexToRemove)
      const updatedValues = formik.values.questions.filter((_, index) => index !== indexToRemove)

      setQuestions(updatedQuestions)
      formik.setFieldValue("questions", updatedValues)
    }
  }

  const updateQuestion = (index: number, value: string) => {
    const updatedQuestions = [...formik.values.questions]
    updatedQuestions[index] = value
    formik.setFieldValue("questions", updatedQuestions)
  }

  const hasContent =
    formik.values.title.trim() !== "" ||
    formik.values.questions.some((q) => q.trim() !== "") ||
    formik.values.answer.trim() !== ""

  const filteredQnaSources = qnaSources.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.questions.some((q: string) => q.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sourceItems: SourceItem[] = filteredQnaSources.map(item => ({
    id: item.id,
    name: item.title,
    size: item.answer.length,
    isNew: true,
    questionsCount: item.questions.length,
  }))

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id])
  }
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(sourceItems.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }
  const handleDeleteItems = (ids: string[]) => {
    setQnaSources(prev => prev.filter(item => !ids.includes(item.id)))
    setSelectedItems(prev => prev.filter(id => !ids.includes(id)))
  }
  const handleRestore = () => {
    setSelectedItems([])
  }

  const getQnAIcon = () => (
    <div className="w-10 h-10 bg-[#F4F4F5] rounded-full text-white text-xs font-medium flex items-center justify-center">
<span className="text-xs rounded-xl px-1.5 py-0.5 font-bold  text-white bg-gray-500">?</span>
    </div>
  )
  const getItemIcon = () => getQnAIcon()

 

  const formatItemDetails = (item: SourceItem) => {
    const qna = qnaSources.find(q => q.id === item.id)
    if (!qna) return ""
    const size = formatFileSize(item.size);
    return `${size} | ${qna.questions.length} question${qna.questions.length > 1 ? "s" : ""}`;
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="bg-white rounded-xl mb-6 border p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Q&A</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Craft responses for important questions, ensuring your AI Agent shares the most relevant info. Use Custom
          Answers to add images and links for enhanced engagement.{" "}
          <a href="#" className="font-semibold">
            Learn more
          </a>
        </p>

        <div className="space-y-4">
          <div>
            <GlobalInput
              label="Title"
              type="text"
              placeholder="Ex: Refund requests"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title ? <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div> : null}
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="relative">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <GlobalInput
                    label="Question"
                    type="text"
                    placeholder="Ex: How do I request a refund?"
                    name={`question-${index}`}
                    value={formik.values.questions[index] || ""}
                    onChange={(e) => updateQuestion(index, e.target.value)}
                  />
                </div>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className=" text-gray-700  hover:text-gray-600 transition-colors"
                    aria-label="Remove question"
                  >
                  <X className="h-9 w-9 shadow-sm rounded-md border border-gray-200 p-2" />
                  </button>
                )}
              </div>
              {formik.errors.questions?.[index] ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.questions[index]}</div>
              ) : null}
            </div>
          ))}

          <div className="mb-4">
            <button
              type="button"
              onClick={addQuestion}
              className="text-md font-medium text-black hover:bg-gray-100 p-1 rounded-md transition-colors"
            >
              + Add another question
            </button>
          </div>

          <div>
            <TextEditor
              titleLabel="Answer"
              titlePlaceholder=""
              editorLabel="Answer"
              editorPlaceholder="Enter your answer..."
              showTitle={false}
              name="answer"
              title=""
              onTitleChange={() => {}}
              editorValue={formik.values.answer}
              onEditorChange={(value) => formik.setFieldValue("answer", value)}
            />
            {formik.touched.answer && formik.errors.answer ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.answer}</div>
            ) : null}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 md:mt-10 mt-16 rounded-md transition-colors flex items-center gap-2 ${
                hasContent && formik.isValid && !isLoading
                  ? "bg-black hover:bg-gray-800 text-white"
                  : "bg-gray-500 text-white cursor-not-allowed"
              }`}
              disabled={!hasContent || !formik.isValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Add Q&A
                </>
              ) : (
                "Add Q&A"
              )}
            </button>
          </div>
        </div>
      </form>

      {qnaSources.length > 0 && (
        <SourcesManager
          items={sourceItems}
          title="Q&A sources"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onDeleteItems={handleDeleteItems}
          onRestore={handleRestore}
          getItemIcon={getItemIcon}
          formatItemDetails={formatItemDetails}
          showRestore={true}
          emptySearchMessage="No Q&A found"
        />
      )}
    </>
  )
}

export default QnATab
