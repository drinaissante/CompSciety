import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";

function MemberFilter({ filter, setFilter }) {
    return (
        <div className="flex items-center gap-4 mb-4">
            <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="college">College</SelectItem>
                <SelectItem value="program">Program</SelectItem>
                <SelectItem value="section">Section</SelectItem>
                <SelectItem value="type">Type</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export { MemberFilter };