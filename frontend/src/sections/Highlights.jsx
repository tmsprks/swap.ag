import { highlights } from '../constants';
import HighlightCard from '../components/HighlightCard';

const Highlights = () => {
  return (
    <section className="max-container flex justify-center flex-wrap gap-9">
      {highlights.map((highlight) => (
        <HighlightCard key={highlight.label} {...highlight} />
      ))}
    </section>
  );
};

export default Highlights;
