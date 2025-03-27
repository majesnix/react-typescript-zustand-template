import { useEffect } from "react";
import { useStore } from "../dataLayer/useStore";

export const ExampleComponent: React.FunctionComponent = () => {
  const examples = useStore((state) => state.examples);
  const getExamples = useStore((state) => state.getExamples);

  useEffect(() => {
    getExamples();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {examples.map((example) => (
        <div key={example.id}>{example.header}</div>
      ))}
    </div>
  );
};
