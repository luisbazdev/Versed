import ServiceServicePreview from "../ServicePreview";

export default function ServicePreview({name, description, category, lpw, price}){
    return (
        <div className="w-full ">
            <ServiceServicePreview name={name} description={description} category={category} lpw={lpw} price={price}/>
        </div>
    )
}