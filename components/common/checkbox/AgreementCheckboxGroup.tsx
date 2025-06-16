import React from "react";
import { Checkbox } from "src/components/ui/checkbox";
import { Label } from "src/components/ui/label";

interface Agreements {
  all: boolean;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  newsletter: boolean;
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
    <div className="flex items-center gap-2">
      <Checkbox
        id="agree-all"
        checked={agreements.all}
        onCheckedChange={() => onCheckbox("all")}
      />
      <Label htmlFor="agree-all" className="text-sm">
        모두 동의
      </Label>
    </div>
    <div className="pl-6 space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="agree-terms"
          checked={agreements.terms}
          onCheckedChange={() => onCheckbox("terms")}
        />
        <Label htmlFor="agree-terms" className="text-sm">
          <>
            <span className="text-caution">(필수)</span>
            <a href="#" className=" hover:text-primary ml-1">
              이용약관
            </a>
          </>
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="agree-privacy"
          checked={agreements.privacy}
          onCheckedChange={() => onCheckbox("privacy")}
        />
        <Label htmlFor="agree-privacy" className="text-sm">
          <>
            <span className="text-caution">(필수)</span>
            <a href="#" className=" hover:text-primary ml-1">
              개인정보 취급방침
            </a>
          </>
        </Label>
      </div>
    </div>
  </div>
);

export default AgreementCheckboxGroup;
