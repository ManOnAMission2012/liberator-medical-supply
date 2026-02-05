import { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, Check, Phone, Mail, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SupplyFinderProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  insuranceType: string;
  productInterest: string[];
  hasPrescribingDoctor: string;
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  receiveResources: boolean;
}

const STORAGE_KEY = "liberator-supply-finder";

const initialFormData: FormData = {
  insuranceType: "",
  productInterest: [],
  hasPrescribingDoctor: "",
  fullName: "",
  phone: "",
  email: "",
  zipCode: "",
  receiveResources: false,
};

export function SupplyFinder({ isOpen, onClose }: SupplyFinderProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || initialFormData);
        setStep(parsed.step || 1);
      } catch (e) {
        console.error("Error loading saved progress:", e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step }));
    }
  }, [formData, step, isSubmitted]);

  const totalSteps = 4;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !formData.insuranceType) {
      newErrors.insuranceType = "Please select your insurance type";
    }

    if (currentStep === 2 && formData.productInterest.length === 0) {
      newErrors.productInterest = "Please select at least one product";
    }

    if (currentStep === 3 && !formData.hasPrescribingDoctor) {
      newErrors.hasPrescribingDoctor = "Please select an option";
    }

    if (currentStep === 4) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Name is required";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = "ZIP code is required";
      } else if (!/^\d{5}$/.test(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid 5-digit ZIP code";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    // Clear saved progress
    localStorage.removeItem(STORAGE_KEY);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    if (isSubmitted) {
      // Reset everything on close after submission
      setFormData(initialFormData);
      setStep(1);
      setIsSubmitted(false);
      localStorage.removeItem(STORAGE_KEY);
    }
    onClose();
  };

  const insuranceOptions = [
    { value: "medicare", label: "Medicare" },
    { value: "medicaid", label: "Medicaid" },
    { value: "private", label: "Private Insurance" },
    { value: "not-sure", label: "Not Sure" },
  ];

  const productOptions = [
    { value: "intermittent-catheters", label: "Intermittent Catheters" },
    { value: "external-catheters", label: "External Catheters" },
    { value: "incontinence", label: "Incontinence Supplies" },
    { value: "ostomy", label: "Ostomy Supplies" },
    { value: "not-sure", label: "Not sure - help me choose" },
  ];

  const toggleProductInterest = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      productInterest: prev.productInterest.includes(value)
        ? prev.productInterest.filter((v) => v !== value)
        : [...prev.productInterest, value],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between bg-accent"
        >
          <h2 className="text-xl font-bold text-white">
            {isSubmitted ? "You're All Set!" : "Find My Supplies"}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            data-testid="button-close-finder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                {Math.round((step / totalSteps) * 100)}% complete
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out rounded-full bg-primary"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {isSubmitted ? (
            <SuccessScreen />
          ) : (
            <>
              {step === 1 && (
                <Step1
                  value={formData.insuranceType}
                  onChange={(value) => setFormData({ ...formData, insuranceType: value })}
                  options={insuranceOptions}
                  error={errors.insuranceType}
                />
              )}
              {step === 2 && (
                <Step2
                  values={formData.productInterest}
                  onToggle={toggleProductInterest}
                  options={productOptions}
                  error={errors.productInterest}
                />
              )}
              {step === 3 && (
                <Step3
                  value={formData.hasPrescribingDoctor}
                  onChange={(value) => setFormData({ ...formData, hasPrescribingDoctor: value })}
                  error={errors.hasPrescribingDoctor}
                />
              )}
              {step === 4 && (
                <Step4
                  formData={formData}
                  onChange={(field, value) => setFormData({ ...formData, [field]: value })}
                  errors={errors}
                />
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 text-white px-6 bg-primary hover:opacity-90"
              data-testid="button-next"
            >
              {step === totalSteps ? "Get My Free Samples" : "Continue"}
              {step < totalSteps && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 1: Insurance Type
function Step1({
  value,
  onChange,
  options,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        What type of insurance do you have?
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        This helps us determine your coverage and potential savings.
      </p>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between ${
              value === option.value
                ? "border-accent bg-accent/10"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            data-testid={`option-insurance-${option.value}`}
          >
            <span className={`font-medium ${value === option.value ? "text-accent" : "text-gray-900 dark:text-white"}`}>
              {option.label}
            </span>
            {value === option.value && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-accent">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Step 2: Product Interest
function Step2({
  values,
  onToggle,
  options,
  error,
}: {
  values: string[];
  onToggle: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        What products are you interested in?
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Select all that apply. We'll help you find the right supplies.
      </p>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onToggle(option.value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between ${
              values.includes(option.value)
                ? "border-accent bg-accent/10"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            data-testid={`option-product-${option.value}`}
          >
            <span className={`font-medium ${values.includes(option.value) ? "text-accent" : "text-gray-900 dark:text-white"}`}>
              {option.label}
            </span>
            {values.includes(option.value) && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-accent">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Step 3: Prescribing Doctor
function Step3({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Do you have a prescribing doctor?
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        A prescription is required for most medical supplies. Don't worry if you don't have one yet!
      </p>
      <div className="space-y-3">
        <button
          onClick={() => onChange("yes")}
          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between ${
            value === "yes"
              ? "border-accent bg-accent/10"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
          data-testid="option-doctor-yes"
        >
          <span className={`font-medium ${value === "yes" ? "text-accent" : "text-gray-900 dark:text-white"}`}>
            Yes, I have a prescribing doctor
          </span>
          {value === "yes" && (
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-accent">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
        <button
          onClick={() => onChange("no")}
          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
            value === "no"
              ? "border-accent bg-accent/10"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
          data-testid="option-doctor-no"
        >
          <div className="flex items-center justify-between">
            <span className={`font-medium ${value === "no" ? "text-accent" : "text-gray-900 dark:text-white"}`}>
              No, I need help with this
            </span>
            {value === "no" && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-accent">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          {value === "no" && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No problem! We can help connect you with a healthcare provider.
            </p>
          )}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Step 4: Contact Info
function Step4({
  formData,
  onChange,
  errors,
}: {
  formData: FormData;
  onChange: (field: keyof FormData, value: string | boolean) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Almost there! How can we reach you?
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        We'll use this information to send you free samples and follow up on your order.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-400" />
            Full Name
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="John Smith"
            className={errors.fullName ? "border-red-500" : ""}
            data-testid="input-fullname"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>
        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-gray-400" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className={errors.phone ? "border-red-500" : ""}
            data-testid="input-phone"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-gray-400" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="john@example.com"
            className={errors.email ? "border-red-500" : ""}
            data-testid="input-email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="zipCode" className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            ZIP Code
          </Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => onChange("zipCode", e.target.value)}
            placeholder="12345"
            maxLength={5}
            className={errors.zipCode ? "border-red-500" : ""}
            data-testid="input-zipcode"
          />
          {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
        </div>
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="receiveResources"
            checked={formData.receiveResources}
            onCheckedChange={(checked) => onChange("receiveResources", checked === true)}
            data-testid="checkbox-resources"
          />
          <Label htmlFor="receiveResources" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            Yes, I'd like to receive educational resources and product tips
          </Label>
        </div>
      </div>
    </div>
  );
}

// Success Screen
function SuccessScreen() {
  const nextSteps = [
    {
      number: 1,
      title: "Confirmation Email",
      description: "Check your inbox for a confirmation email with your request details.",
    },
    {
      number: 2,
      title: "Insurance Verification",
      description: "Our team will verify your insurance coverage within 24-48 hours.",
    },
    {
      number: 3,
      title: "Free Samples Shipped",
      description: "Your free samples will be shipped directly to your door.",
    },
  ];

  return (
    <div className="text-center">
      <div 
        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: "#22c55e" }}
      >
        <Check className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        You're All Set!
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Our team will handle the rest. Here's what happens next:
      </p>
      <div className="space-y-4 text-left">
        {nextSteps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm bg-accent">
              {step.number}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
