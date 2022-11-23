import { Alert, MenuItem, TextField } from "@mui/material";

export default function ServiceDetails({
    handleChangeName, 
    handleChangeDescription,
    handleChangeCategory,
    handleChangeLpw,
    name, 
    description, 
    category, 
    lpw}){
    const categories = [
        {
            value: "Computer Science",
            label: "Computer Science"
        },
        {
            value: "Web Design",
            label: "Web Design"
        },
        {
            value: "Graphic Design",
            label: "Graphic Design"
        },
        {
            value: "Video Editing",
            label: "Video Editing"
        }
    ]

    return (
        <div className="w-[550px] gap-4 flex flex-col">
            <Alert severity="info">Some settings of your service can be updated later, e.g. name, description.</Alert>
            <TextField 
            label="Name" 
            required
            onChange={handleChangeName}
            value={name}
            helperText="This is the name students will see when they look for your service."/>
            <TextField 
            rows={10} 
            label="Description" 
            required 
            multiline 
            helperText="Give a detailed overview of what you are offering."
            onChange={handleChangeDescription}
            value={description}/>
            <Alert severity="warning">The category you choose for your service is permanent can not be changed so make sure you choose the right one!</Alert>
            <TextField 
            label="Category" 
            select 
            required
            onChange={handleChangeCategory}
            value={category}
            helperText="Which academic assignment is your service targeted to?">
                {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
                ))}
            </TextField>
            <TextField 
            label="Mentoring Weeks" 
            helperText="How many weeks will you teach?"
            onChange={handleChangeLpw}
            value={lpw}
            required/>
        </div>
    )
}
