const LpCardSkeleton = () => {
  return(
    <div className = "relative rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className = {"bg-gray-300 w-full h-48"} />
      <div className = "absolute bg-black bg-opacity-75 p-2">
        <div className = "bg-gray-400 h-4 w-3/4 rounded-sm"/>
      </div>
    </div>
  )
}

export default LpCardSkeleton;