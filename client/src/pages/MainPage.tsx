import { LibrarySlider } from '../components/UI/LibrarySlider';

export const MainPage = () => {
  return (
    <section>
      <LibrarySlider name="Fiction" />
      <LibrarySlider name="Nonfiction" />
      <LibrarySlider name="Poetry" />
      <LibrarySlider name="Philosophy" />
      <LibrarySlider name="Fantasy" />
      <LibrarySlider name="Romance" />
    </section>
  );
};
