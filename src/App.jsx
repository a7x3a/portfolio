
import { Avatar , Button } from "@material-tailwind/react"
function App() {

  return (
    <>
      <div className="w-full h-[100dvh] flex flex-col gap-10 justify-center items-center bg-red-400">
        <p className="text-5xl  text-white font-bold tracking-widest uppercase">START FROM HERE</p>
        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
        <Button color="white" style={{cursor : 'pointer'}} size="regular" ripple="light">Click</Button>
      </div>
    </>
  )
}

export default App
