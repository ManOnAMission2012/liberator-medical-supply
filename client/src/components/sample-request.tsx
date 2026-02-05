import { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, Check, Phone, Mail, MapPin, User, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SampleRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  selectedProducts: string[];
  sendAssortment: boolean;
  insuranceProvider: string;
  memberId: string;
}

const STORAGE_KEY = "liberator-sample-request";

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  zipCode: "",
  selectedProducts: [],
  sendAssortment: false,
  insuranceProvider: "",
  memberId: "",
};

const productOptions = [
  { value: "intermittent-catheters", label: "Intermittent Catheters" },
  { value: "external-catheters", label: "External Catheters" },
  { value: "foley-catheters", label: "Foley Catheters" },
  { value: "ostomy-pouches", label: "Ostomy Pouches" },
  { value: "ostomy-accessories", label: "Ostomy Accessories" },
  { value: "adult-briefs", label: "Adult Briefs" },
  { value: "protective-underwear", label: "Protective Underwear" },
  { value: "incontinence-pads", label: "Incontinence Pads" },
];

const insuranceProviders = [
  { value: "medicare", label: "Medicare" },
  { value: "medicaid", label: "Medicaid" },
  { value: "aetna", label: "Aetna" },
  { value: "blue-cross", label: "Blue Cross Blue Shield" },
  { value: "cigna", label: "Cigna" },
  { value: "humana", label: "Humana" },
  { value: "united", label: "UnitedHealthcare" },
  { value: "other", label: "Other" },
  { value: "none", label: "No Insurance / Self-Pay" },
];

export function SampleRequest({ isOpen, onClose }: SampleRequestProps) {
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

  const totalSteps = 3;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = "ZIP code is required";
      } else if (!/^\d{5}$/.test(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid 5-digit ZIP code";
      }
    }

    if (currentStep === 2) {
      if (formData.selectedProducts.length === 0 && !formData.sendAssortment) {
        newErrors.products = "Please select at least one product or choose 'Send me an assortment'";
      }
    }

    // Step 3 (Insurance) is optional, no validation needed

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
    localStorage.removeItem(STORAGE_KEY);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    if (isSubmitted) {
      setFormData(initialFormData);
      setStep(1);
      setIsSubmitted(false);
      localStorage.removeItem(STORAGE_KEY);
    }
    onClose();
  };

  const toggleProduct = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(value)
        ? prev.selectedProducts.filter((v) => v !== value)
        : [...prev.selectedProducts, value],
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
          className="px-6 py-4 flex items-center justify-between bg-primary"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">
              {isSubmitted ? "Samples On the Way!" : "Get Free Samples"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            data-testid="button-close-samples"
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
                className="h-full transition-all duration-500 ease-out rounded-full bg-accent"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {isSubmitted ? (
            <ConfirmationScreen email={formData.email} />
          ) : (
            <>
              {step === 1 && (
                <ContactStep
                  formData={formData}
                  onChange={(field, value) => setFormData({ ...formData, [field]: value })}
                  errors={errors}
                />
              )}
              {step === 2 && (
                <ProductStep
                  formData={formData}
                  onToggleProduct={toggleProduct}
                  onToggleAssortment={(checked) => setFormData({ ...formData, sendAssortment: checked })}
                  error={errors.products}
                />
              )}
              {step === 3 && (
                <InsuranceStep
                  formData={formData}
                  onChange={(field, value) => setFormData({ ...formData, [field]: value })}
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
                data-testid="button-sample-back"
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
              data-testid="button-sample-next"
            >
              {step === totalSteps ? "Request Samples" : "Continue"}
              {step < totalSteps && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 1: Contact Info
function ContactStep({
  formData,
  onChange,
  errors,
}: {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Where should we send your samples?
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        We'll use this to ship your free samples and follow up with helpful tips.
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
            data-testid="input-sample-fullname"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
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
            data-testid="input-sample-email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
            data-testid="input-sample-phone"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
            data-testid="input-sample-zipcode"
          />
          {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
        </div>
      </div>
    </div>
  );
}

// Step 2: Product Selection
function ProductStep({
  formData,
  onToggleProduct,
  onToggleAssortment,
  error,
}: {
  formData: FormData;
  onToggleProduct: (value: string) => void;
  onToggleAssortment: (checked: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Which samples would you like?
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Select the products you'd like to try, or let us send you an assortment.
      </p>

      {/* Send Assortment Option */}
      <div 
        className={`mb-6 p-4 rounded-lg border-2 transition-all cursor-pointer ${
          formData.sendAssortment 
            ? "border-primary bg-primary/10" 
            : "border-gray-200 dark:border-gray-700"
        }`}
        onClick={() => onToggleAssortment(!formData.sendAssortment)}
      >
        <div className="flex items-center gap-3">
          <Checkbox
            checked={formData.sendAssortment}
            onCheckedChange={(checked) => onToggleAssortment(checked === true)}
            data-testid="checkbox-assortment"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Send me an assortment
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Not sure what you need? We'll send a variety of our most popular samples.
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        {formData.sendAssortment && (
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 z-10 rounded-lg" />
        )}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Or select specific products:
        </p>
        <div className="grid grid-cols-2 gap-3">
          {productOptions.map((product) => (
            <button
              key={product.value}
              onClick={() => !formData.sendAssortment && onToggleProduct(product.value)}
              disabled={formData.sendAssortment}
              className={`p-3 rounded-lg border-2 text-left text-sm transition-all ${
                formData.selectedProducts.includes(product.value)
                  ? "border-accent bg-accent/10"
                  : "border-gray-200 dark:border-gray-700"
              } ${formData.sendAssortment ? "opacity-50 cursor-not-allowed" : ""}`}
              data-testid={`checkbox-product-${product.value}`}
            >
              <div className="flex items-center gap-2">
                {formData.selectedProducts.includes(product.value) && (
                  <Check className="w-4 h-4 text-accent" />
                )}
                <span className={formData.selectedProducts.includes(product.value) ? "text-accent font-medium" : ""}>
                  {product.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Step 3: Insurance (Optional)
function InsuranceStep({
  formData,
  onChange,
}: {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Insurance Information
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        This is optional, but helps us check if your supplies may be covered.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="insuranceProvider" className="mb-2 block">
            Insurance Provider
          </Label>
          <Select
            value={formData.insuranceProvider}
            onValueChange={(value) => onChange("insuranceProvider", value)}
          >
            <SelectTrigger data-testid="select-insurance-provider">
              <SelectValue placeholder="Select your provider (optional)" />
            </SelectTrigger>
            <SelectContent>
              {insuranceProviders.map((provider) => (
                <SelectItem key={provider.value} value={provider.value}>
                  {provider.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="memberId" className="mb-2 block">
            Member ID (Optional)
          </Label>
          <Input
            id="memberId"
            value={formData.memberId}
            onChange={(e) => onChange("memberId", e.target.value)}
            placeholder="Enter your member ID"
            data-testid="input-member-id"
          />
          <p className="mt-1 text-xs text-gray-500">
            Found on your insurance card
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Skip this step?</strong> No problem! You can still receive free samples. 
            Our team can help verify your insurance coverage later.
          </p>
        </div>
      </div>
    </div>
  );
}

// Confirmation Screen
function ConfirmationScreen({ email }: { email: string }) {
  return (
    <div className="text-center">
      <div 
        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: "#22c55e" }}
      >
        <Package className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Your Samples Are On the Way!
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        We're preparing your free samples for shipment.
      </p>

      {/* Delivery Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Expected Delivery</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">5-7 business days</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Confirmation Email</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sent to {email}</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="text-left">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's Next:</h4>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
            <span>Check your email for order confirmation and tracking info</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
            <span>Try your samples and see what works best for you</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
            <span>Call us at 1-877-899-9208 to place your regular order</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
