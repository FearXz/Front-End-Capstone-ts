import { useEffect, useState } from "react";

function ContactPage() {
  const [images, setImages] = useState<string[]>([]);
  const [randomImage, setRandomImage] = useState<string>(images[0]);

  useEffect(() => {
    const loadImages = async () => {
      const importAll = async (r: any) => {
        const images = [];
        for (const path in r) {
          images.push((await r[path]()).default);
        }
        return images;
      };
      const images = await importAll(import.meta.glob("../../assets/images/randomImages/*.jpg"));
      setImages(images);
      setRandomImage(images[Math.floor(Math.random() * images.length)]);
    };
    loadImages();
  }, []);

  return (
    <main>
      <div style={{ height: "280px" }} className="">
        {images && <img src={randomImage} alt="description" className=" object-fit-cover w-100" />}
      </div>
    </main>
  );
}

export default ContactPage;
