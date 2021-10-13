import "./styles.scss"
import {
    hashCode,
    intToRGB
} from "../../helper"

const Avatar = ({data, className}) => {
    return (
    <>
        <div class={`wrapper ${className ? className : ''}`}>
            <div class="icon user">
                <div class="tooltip">{data.name.toUpperCase()}</div>
                {data.image !== '' ?
                    <img className="avatar" src={data.image} alt="" />
                    :
                    <div className="avatar" style={{ backgroundColor: intToRGB(hashCode(data.name.slice(0, data.name.length-1))) }}>{data.name.slice(0,2).toUpperCase()}</div>}
            </div>
      </div>
    </>
    )
}

export default Avatar