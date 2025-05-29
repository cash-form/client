import React from "react";
import CommonCheckbox from "./CommonCheckbox";

interface Agreements {
  all: boolean;
  terms: boolean;
  privacy: boolean;
}

interface AgreementCheckboxGroupProps {
  agreements: Agreements;
  onCheckbox: (name: keyof Agreements) => void;
}

const AgreementCheckboxGroup: React.FC<AgreementCheckboxGroupProps> = ({
  agreements,
  onCheckbox,
}) => (
  <div className="space-y-3 py-4 border-t border-gray-200 mb-0">
    <CommonCheckbox
      id="agree-all"
      checked={agreements.all}
      onChange={() => onCheckbox("all")}
      label={"모두 동의"}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <div className="pl-6 space-y-2">
      <CommonCheckbox
        id="agree-terms"
        checked={agreements.terms}
        onChange={() => onCheckbox("terms")}
        label={
          <>
            <span className="text-caution">(필수)</span>
            <a href="#" className="text-foreground hover:text-primary ml-1">
              이용약관
            </a>
          </>
        }
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <CommonCheckbox
        id="agree-privacy"
        checked={agreements.privacy}
        onChange={() => onCheckbox("privacy")}
        label={
          <>
            <span className="text-caution">(필수)</span>
            <a href="#" className="text-foreground hover:text-primary ml-1">
              개인정보 취급방침
            </a>
          </>
        }
        className="h-4 w-4 rounded"
      />
    </div>
  </div>
);

export default AgreementCheckboxGroup;
