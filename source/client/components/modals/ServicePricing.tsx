import { Alert, MenuItem, TextField } from "@mui/material";

export default function ServicePricing({handleChangePrice, price}){
    return (
        <div className="w-[550px] gap-4 flex flex-col pb-8">
            <TextField 
            label="Price" 
            helperText="The amount you want to charge for your services."
            onChange={handleChangePrice}
            value={price}
            required/>
        </div>
    )
}