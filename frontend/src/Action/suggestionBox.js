export const showSuggestion = (boolean) => {
    return {
      type: "SUGGESTION_BOX",
      payload: boolean
    };
  };