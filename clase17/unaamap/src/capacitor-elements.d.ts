declare global {
  namespace JSX {
    interface IntrinsicElements {
      'capacitor-google-map': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}