import { useState } from "react";
import { useFormik } from "formik";
import {  Text, Loader2 } from "lucide-react";
import TextEditor from "../TextEditor";
import type { TextItem, SourceItem } from "../../types/types";
import SourcesManager from "../SourcesManager";
import formatFileSize from "../../constants/FileSize";

const TextTab = () => {
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      editorValue: "",
    },
    validate: (values) => {
      const errors: { title?: string } = {};
      if (values.title.length > 40) {
        errors.title = "Title cannot exceed 40 characters";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTextItem: TextItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: values.title,
        content: values.editorValue,
        isNew: true,  
      };
      
      setTextItems(prev => [...prev, newTextItem]);
      resetForm();
      setIsLoading(false);
    },
  });

  const hasContent = formik.values.title.trim() !== "" || formik.values.editorValue.trim() !== "";

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteItems = (ids: string[]) => {
    setTextItems(prev => prev.filter(item => !ids.includes(item.id)));
    setSelectedItems(prev => prev.filter(id => !ids.includes(id)));
  };

  const handleRestore = () => {
    console.log("Restored text snippets:", selectedItems);
  };

  const filteredItems = textItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sourceItems: SourceItem[] = filteredItems.map((item) => ({
    id: item.id,
    name: item.title,
    size: item.content.length,
    isNew: item.isNew,
  }));

  const getTextIcon = () => (
    <div className="w-9 h-9 bg-[#F4F4F5] rounded-full text-white text-xs font-medium flex items-center justify-center">
      <Text className="w-5 h-5 text-[#87878F]" />
    </div>
  );



  const formatItemDetails = (item: SourceItem) => {
    const textItem = textItems.find(t => t.id === item.id);
    if (!textItem) return "";
    const size = formatFileSize(item.size);
    return `${size} `;
  };

  return (
    <>
      <div className="bg-white rounded-xl border mb-6 p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Text</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Add and process plain text-based sources to train your AI Agent with precise information.{' '}
          <a href="#" className="underline ">Learn more</a>
        </p>
        <TextEditor
          titleLabel="Title"
          titlePlaceholder="Ex: Refund requests"
          editorLabel="Text"
          editorPlaceholder="Enter your text"
          title={formik.values.title}
          name="title"
          onTitleChange={formik.handleChange}
          editorValue={formik.values.editorValue}
          onEditorChange={(value) => formik.setFieldValue('editorValue', value)}
          titleError={formik.errors.title}
        />
        <div className="flex justify-end mt-20 md:mt-14">
          <button
            type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={!hasContent || !formik.isValid || isLoading}
            className={`px-4 py-1.5 rounded-md transition-colors flex items-center gap-2 ${
              hasContent && formik.isValid && !isLoading
                ? "bg-black hover:bg-gray-800 text-white"
                : "bg-[#6B7280] text-white cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Add text snippet
              </>
            ) : (
              "Add text snippet"
            )}
          </button>
        </div>
      </div>

      {textItems.length > 0 && (
        <SourcesManager
          items={sourceItems}
          title="Text sources"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onDeleteItems={handleDeleteItems}
          onRestore={handleRestore}
          getItemIcon={getTextIcon}
          formatItemDetails={formatItemDetails}
          showRestore={true}
          emptySearchMessage="No Result found"
        />
      )}
    </>
  );
};

export default TextTab; 