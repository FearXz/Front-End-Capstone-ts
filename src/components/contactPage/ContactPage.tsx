import { useEffect, useState } from "react";
import ContactBreadCrumb from "./inner/ContactBreadCrumb";
import ContactHero from "./inner/ContactHero";
import ContactForm from "./inner/ContactForm";
import ContactAffiliate from "./inner/ContactAffiliate";

function ContactPage() {
  const [images, setImages] = useState<string[]>([]);
  const [randomImage, setRandomImage] = useState<string>(images[0]);

  const loadImages = async () => {
    const images = await importAll(import.meta.glob("../../assets/images/randomImages/*.jpg"));
    setImages(images);
    setRandomImage(images[Math.floor(Math.random() * images.length)]);
  };
  const importAll = async (r: any) => {
    const images = [];
    for (const path in r) {
      images.push((await r[path]()).default);
    }
    return images;
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <main>
      <div className="">
        {images && <img src={randomImage} alt="description" className=" object-fit-cover w-100 fix-h-300" />}
      </div>
      <ContactBreadCrumb />
      <ContactHero />
      <ContactForm />
      <ContactAffiliate />
    </main>
  );
}

export default ContactPage;
