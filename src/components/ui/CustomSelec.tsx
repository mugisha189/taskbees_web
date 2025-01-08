import { Field } from "formik";

const SelectField = ({ label, ...props }: any) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Field {...props} as="select" className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500">
        {props.children}
      </Field>
    </div>
  );
};
export default SelectField; 