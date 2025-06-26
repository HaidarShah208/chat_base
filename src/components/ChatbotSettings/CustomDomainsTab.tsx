import { useFormik } from "formik"
import Input from "../Form/Input"
import type { CustomDomainsTabProps } from "../../types/types"

const CustomDomainsTab = ({ onAddDomain }: CustomDomainsTabProps) => {
  const formik = useFormik({
    initialValues: {
      domain: "",
    },
    validate: (values) => {
      const errors: { domain?: string } = {};
      if (!values.domain) {
        errors.domain = "Domain is required";
      } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(values.domain)) {
        errors.domain = "Please enter a valid domain (e.g., chat.mywebsite.com)";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      onAddDomain(values.domain);
      resetForm();
    },
  });

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Custom domains</h2>
        <p className="text-gray-600 text-sm">
          Use your own custom domains for the embed script, iframe, and agent link.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex gap-2">
        <div className="flex-1">
          <Input
            value={formik.values.domain}
            onChange={(value) => formik.setFieldValue('domain', value)}
            placeholder="chat.mywebsite.com"
          />
          <div className="h-5">
            {formik.errors.domain ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.domain}</div>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          className={`font-medium py-2 px-6 rounded-lg text-sm transition-colors self-start ${
            formik.isValid && formik.values.domain
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-500 text-white cursor-not-allowed"
          }`}
          disabled={!formik.isValid || !formik.values.domain}
        >
          Add
        </button>
      </form>

      <div className="mt-4">
        <p className="text-gray-500 text-sm">
          *Note: If your domain is example.com, we recommend using chat.example.com as your custom subdomain. You can replace chat with anything you like, as long it's a valid subdomain.
        </p>
      </div>
    </div>
  )
}

export default CustomDomainsTab 