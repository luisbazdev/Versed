import Rating from '@mui/material/Rating'
import { TextField, Box, Container } from '@mui/material'

export default function ServiceServicePreview({name, description, category, lpw, price}){
	return (
		<Container className="grid overflow-y-auto border border-gray-300 rounded">
			<Box className="px-4 py-3 overflow-y-auto">
				<Box className="flex items-center">
					<p className="text-md text-gray-600">{category} > <span className="font-semibold text-black text-lg">{name}</span></p>
					<Rating className="ml-2" name="half-rating-read" value={0} precision={1} readOnly/>
				</Box>

				<Box className="w-full">
                    <TextField 
                    className="w-full border-none outline-none"
                    multiline 
                    value={description}/>
				</Box>

				<Box className="flex items-center gap-2 text-gray-900">
					<span className="text-lg font-semibold">{lpw} Lessons per week</span>
				</Box>
			</Box>
		</Container>
	)
}