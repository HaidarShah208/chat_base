import { useFormik } from "formik"
import type { WebhookTabProps } from "../../types/types"
import Input from "../Form/Input"

const WebhookTab = ({ onCreateWebhook }: WebhookTabProps) => {
  const formik = useFormik({
    initialValues: {
      selectedEvents: [] as string[],
      endpointUrl: "",
    },
    validate: (values) => {
      const errors: { selectedEvents?: string; endpointUrl?: string } = {};
      if (values.selectedEvents.length === 0) {
        errors.selectedEvents = "At least one event must be selected";
      }
      if (!values.endpointUrl) {
        errors.endpointUrl = "Endpoint URL is required";
      } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(values.endpointUrl)) {
        errors.endpointUrl = "Please enter a valid URL (e.g., https://mywebsite.com/webhooks)";
      }
      return errors;
    },
    onSubmit: (values) => {
      onCreateWebhook();
      console.log(values);
    },
  });

  const handleEventChange = (eventName: string, checked: boolean) => {
    if (checked) {
      formik.setFieldValue('selectedEvents', [...formik.values.selectedEvents, eventName]);
    } else {
      formik.setFieldValue('selectedEvents', formik.values.selectedEvents.filter(event => event !== eventName));
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 mb-4 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Webhooks</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-base font-semibold mb-2">Events</h3>
          <p className="text-gray-600 text-sm mb-4">Select the events the webhook will listen to. At least one must be selected.</p>
          
          <div className="border rounded-lg p-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-3 w-3 text-blue-600"
                checked={formik.values.selectedEvents.includes("leads.submit")}
                onChange={(e) => handleEventChange("leads.submit", e.target.checked)}
              />
              <div>
                <p className="font-medium text-sm">Leads submitted</p>
              </div>
            </label>
            <p className="ps-5 text-sm text-gray-500">leads.submit</p>
          </div>
          {formik.errors.selectedEvents ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.selectedEvents}</div>
          ) : null}
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2">Endpoint</h3>
          <p className="text-gray-600 mb-4 text-sm">Webhooks events will be sent as a POST request to this URL.</p>
          
          <Input 
            value={formik.values.endpointUrl} 
            onChange={(value) => formik.setFieldValue('endpointUrl', value)} 
            placeholder="https://mywebsite.com/webhooks" 
          />
          {formik.errors.endpointUrl ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.endpointUrl}</div>
          ) : null}
        </div>
      </form>

      <div className="mt-8 flex justify-end">
        <button 
          type="submit"
          className={`font-medium py-2 px-6 rounded-lg text-sm transition-colors ${
            formik.isValid && formik.values.endpointUrl && formik.values.selectedEvents.length > 0
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-500 text-white cursor-not-allowed"
          }`}
          disabled={!formik.isValid || !formik.values.endpointUrl || formik.values.selectedEvents.length === 0}
        >
          Create webhook
        </button>
      </div>
    </div>
  )
}

export default WebhookTab 