
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"

function SelectField({
    label,
    options,
    defaultValue,
}: {
    label: string;
    options: string[];
    defaultValue?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-gray-700">{label}</Label>
            <select
                defaultValue={defaultValue}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default function CreateJob() {
    return (
        <>
            <DialogContent className="sm:max-w-200 h-200 overflow-y-scroll  font-inter">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                {/* Body */}
                <div className="px-6 py-5 flex flex-col gap-5">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-700">Job Title</Label>
                            <Input placeholder="Type here...." className="border-gray-200 focus-visible:ring-blue-500" />
                        </div>
                        <SelectField
                            label="Department / Category"
                            defaultValue="Civil Engineering"
                            options={["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "IT & Software", "Management"]}
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                            label="Employment Type"
                            defaultValue="Full Time"
                            options={["Full Time", "Part Time", "Contract", "Freelance"]}
                        />
                        <SelectField
                            label="Job Type"
                            defaultValue="On-site"
                            options={["On-site", "Remote", "Hybrid"]}
                        />
                    </div>

                    {/* Job Summary */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-gray-700">Job Summary</Label>
                        <textarea
                            placeholder="Type here....."
                            rows={4}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Key Responsibilities */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-gray-700">Key Responsibilities</Label>
                        <textarea
                            placeholder="Type here....."
                            rows={4}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Job Requirements */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-gray-700">Job Requirements</Label>
                        <textarea
                            placeholder="Type here....."
                            rows={4}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Row 3: Location + Salary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-700">Job Location</Label>
                            <Input placeholder="Type here...." className="border-gray-200 focus-visible:ring-blue-500" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-700">Salary Range</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="120K-130k"
                                    defaultValue="120K-130k"
                                    className="border-gray-200 focus-visible:ring-blue-500 flex-1"
                                />
                                <div className="relative">
                                    <select className="appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-7">
                                        <option>$</option>
                                        <option>€</option>
                                        <option>£</option>
                                        <option>₹</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Min Exp + Deadline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                            label="Minimum Experience"
                            options={["1 year", "2 years", "3 years", "5+ years", "10+ years"]}
                        />
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-700">Deadline</Label>
                            <Input type="date" className="border-gray-200 focus-visible:ring-blue-500" />
                        </div>
                    </div>

                    {/* Job Banner */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-gray-700">Job Banner</Label>
                        <div className="border border-gray-200 rounded-lg px-3 py-2.5 flex items-center">
                            <button className="border border-gray-300 text-sm text-gray-600 rounded px-3 py-1 hover:bg-gray-50 transition-colors">
                                Choose your image
                            </button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>

        </>
    )
}
