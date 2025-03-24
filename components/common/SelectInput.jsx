import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectInput({disable=false, label,placeholder,options,width, selected, setSelected}) {
  return (
    <Select value={selected} disabled={disable} onValueChange={(value)=>setSelected(value)}>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {
            options.map((option)=>(
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
