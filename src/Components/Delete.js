import { BsTrashFill } from 'react-icons/bs'

const Delete = ({ deleteImage }) => {
  return (
      <>
      <BsTrashFill
        style={{ color: "red", top: "43%", position: "relative" }}
        onClick={ deleteImage } />
      </>
  )
}

export default Delete