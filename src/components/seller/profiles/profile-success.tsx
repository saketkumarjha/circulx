import Image from "next/image"

export function ProfileSuccess() {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-3xl flex justify-center">
        <Image
          src="/profile-sucess.png"
          alt="Profile submitted successfully"
          width={600}
          height={400}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}

