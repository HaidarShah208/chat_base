import { useFormik } from "formik";
import DangerZone from "../DangerZone";
import type { AgentGeneralTabProps } from "../../types/types";
import GlobalInput from "../Form/GlobalInput";

const GeneralTab = ({ onDeleteTeam }: AgentGeneralTabProps) => {
  const formik = useFormik({
    initialValues: {
      teamName: "Ali Haidar's Team",
      teamUrl: "ali-haidars-team",
    },
    validate: (values) => {
      const errors: { teamName?: string; teamUrl?: string } = {};
      if (!values.teamName) {
        errors.teamName = "Team name is required";
      }
      if (!values.teamUrl) {
        errors.teamUrl = "Team URL is required";
      } else if (!/^[a-z0-9-]+$/.test(values.teamUrl)) {
        errors.teamUrl = "URL can only contain lowercase letters, numbers, and hyphens.";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="bg-white rounded-xl border p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">General</h2>
        <div className="mb-3">
          <GlobalInput
            label="Team name"
            type="text"
            placeholder="Enter your team name"
            name="teamName"
            value={formik.values.teamName}
            onChange={formik.handleChange}
            className="text-base"
          />
          {formik.touched.teamName && formik.errors.teamName ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.teamName}</div>
          ) : null}
        </div>
        <div className="mb-2">
          <GlobalInput
            label="Team URL"
            type="text"
            placeholder="Enter a URL slug"
            name="teamUrl"
            value={formik.values.teamUrl}
            onChange={formik.handleChange}
            className="text-base"
          />
          {formik.touched.teamUrl && formik.errors.teamUrl ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.teamUrl}</div>
          ) : null}
        </div>
        <div className="text-gray-500 text-sm mb-4">Changing the team URL will redirect you to the new address.</div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`font-semibold text-white py-2 px-5 rounded-lg text-sm mt-4 ${
              formik.dirty && formik.isValid
                ? "bg-black "
                : "bg-gray-500/95  cursor-not-allowed"
            }`}
            disabled={!(formik.dirty && formik.isValid)}
          >
            Save
          </button>
        </div>
      </form>
      <div className="my-10">
        <div className="flex items-center mb-10">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="mx-4 text-xs font-bold text-red-400 tracking-widest">DANGER ZONE</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
        <DangerZone
          heading="Delete team"
          description="Once you delete your team account, there is no going back. Please be certain. All your uploaded data and trained agents will be deleted."
          buttonText={`Delete ${formik.values.teamName}`}
          onConfirmDelete={onDeleteTeam}
          modalTitle={`Delete ${formik.values.teamName}?`}
          modalDescription={
            <>
              This will delete all the data associated with your team, and cancel all ongoing subscriptions and add-ons.
              <br />
              <strong className="mt-2 text-gray-500 block">This action cannot be undone.</strong>
            </>
          }
          valueToConfirm={formik.values.teamName}
          modalInputLabel="Team Name"
          modalInputHelpText="Please type your team name to confirm"
        />
      </div>
    </>
  );
};

export default GeneralTab; 