import { useFormik } from "formik";
import Input from "../Form/Input";
import Dropdown from "../Dropdown";
import { taxTypeOptions } from "../../constants/DropdownOptions";

const BillingTab = () => {
  const billingDetailsFormik = useFormik({
    initialValues: {
      organizationName: "",
      country: "United States",
      addressLine1: "",
    },
    validate: (values) => {
      const errors: { organizationName?: string; addressLine1?: string } = {};
      if (!values.organizationName) {
        errors.organizationName = "Organization name is required";
      } else if (values.organizationName.length < 3) {
        errors.organizationName = "Organization name must be at least 3 characters";
      }
      if (!values.addressLine1) {
        errors.addressLine1 = "Address is required";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  const billingEmailFormik = useFormik({
    initialValues: {
      billingEmail: "haider753841@gmail.com",
    },
    validate: (values) => {
      const errors: { billingEmail?: string } = {};
      if (!values.billingEmail) {
        errors.billingEmail = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.billingEmail)) {
        errors.billingEmail = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    },
  });

  const taxIdFormik = useFormik({
    initialValues: {
      taxType: "None",
      taxId: "",
    },
    validate: (values) => {
      const errors: { taxId?: string } = {};
      if (!values.taxId) {
        errors.taxId = "Tax ID is required";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col mb-10 gap-8">
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Billing details</h2>
        <form onSubmit={billingDetailsFormik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-2">Organization name</label>
            <Input
              type="text"
              value={billingDetailsFormik.values.organizationName}
              onChange={(value) => billingDetailsFormik.setFieldValue('organizationName', value)}
              placeholder="Enter organization name"
            />
            {billingDetailsFormik.errors.organizationName ? (
              <div className="text-red-500 text-sm mt-1">{billingDetailsFormik.errors.organizationName}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm mb-2">Country or region</label>
            <select
              name="country"
              value={billingDetailsFormik.values.country}
              onChange={billingDetailsFormik.handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black appearance-none bg-white"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Address line 1</label>
            <Input
              type="text"
              value={billingDetailsFormik.values.addressLine1}
              onChange={(value) => billingDetailsFormik.setFieldValue('addressLine1', value)}
              placeholder="Enter address"
            />
            { billingDetailsFormik.errors.addressLine1 ? (
              <div className="text-red-500 text-sm mt-1">{billingDetailsFormik.errors.addressLine1}</div>
            ) : null}
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className={`font-semibold py-2 px-6 rounded-lg text-sm ${
                billingDetailsFormik.dirty && billingDetailsFormik.isValid
                  ? "bg-black text-white"
                  : "bg-gray-500 text-white cursor-not-allowed"
              }`}
              disabled={!(billingDetailsFormik.dirty && billingDetailsFormik.isValid)}
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Billing email</h2>
        <form onSubmit={billingEmailFormik.handleSubmit}>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Email used for invoices.</p>
            <Input
              type="email"
              value={billingEmailFormik.values.billingEmail}
              onChange={(value) => billingEmailFormik.setFieldValue('billingEmail', value)}
              placeholder="Enter billing email"
            />
            { billingEmailFormik.errors.billingEmail ? (
              <div className="text-red-500 text-sm mt-1">{billingEmailFormik.errors.billingEmail}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`font-semibold py-2 px-6 rounded-lg text-sm ${
                billingEmailFormik.dirty && billingEmailFormik.isValid
                  ? 'bg-black text-white hover:bg-gray-900'
                  : 'bg-gray-500 text-white cursor-not-allowed'
              }`}
              disabled={!(billingEmailFormik.dirty && billingEmailFormik.isValid)}
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Tax ID</h2>
        <p className="text-sm text-gray-500 mb-4">If you want your upcoming invoices to display a specific tax ID, please enter it here.</p>
        <form onSubmit={taxIdFormik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-2">Tax type</label>
            <Dropdown
              value={taxIdFormik.values.taxType}
              onChange={(value) => taxIdFormik.setFieldValue('taxType', value)}
              options={taxTypeOptions}
              placeholder="Search tax type..."
              fullWidth={true}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">ID</label>
            <Input
              type="text"
              value={taxIdFormik.values.taxId}
              onChange={(value) => taxIdFormik.setFieldValue('taxId', value)}
              placeholder="N/A"
            />
            {  taxIdFormik.errors.taxId ? (
              <div className="text-red-500 text-sm mt-1">{taxIdFormik.errors.taxId}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`font-semibold py-2 px-6 rounded-lg text-sm ${
                taxIdFormik.dirty && taxIdFormik.isValid
                  ? "bg-black text-white"
                  : "bg-gray-500 text-white cursor-not-allowed"
              }`}
              disabled={!(taxIdFormik.dirty && taxIdFormik.isValid)}
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Billing method</h2>
        <div className="border-b border-t border-gray-200">
          <div className="grid font-medium grid-cols-3 text-sm text-black py-2">
            <div>Brand</div>
            <div>Number (Last 4)</div>
            <div>Exp. Date</div>
          </div>
        </div>
        <div className="py-8 text-sm text-center text-black">
          No results.
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-black text-white font-semibold py-2 px-6 rounded-lg text-sm">
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Billing history</h2>
        <div className="border-b border-t border-gray-200">
          <div className="grid grid-cols-4 text-sm font-medium text-black py-2">
            <div>Invoice Number</div>
            <div>Created</div>
            <div>Amount</div>
            <div>Status</div>
          </div>
        </div>
        <div className="py-8 text-sm text-center text-black">
          No results.
        </div>
      </div>
    </div>
  );
};

export default BillingTab; 