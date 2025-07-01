import { addFieldToListIfNotExist } from "./addFieldToListIfNotExists";
import { addListIfNotExist } from "./addListIfNotExists";
import { fields } from "./fields";

  
export function Init(props: InitProps): React.ReactElement {
  const [outputCollection, setOutputCollection] = React.useState<string[]>([]);
    const listTitle = "listTitle"
  function output(str: string): void {
    setOutputCollection((state) => {
      return [...state, str];
    });
  }

    async function _addLists(): Promise<void> {
        setOutputCollection([]);

        try {
        // https://learn.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-wssts/8bf797af-288c-4a1d-a14b-cf5394e636cf
        // 101 => Document Library
        const checkIfListExistsResult = await addListIfNotExist(
            props.spfi,
            listTitle,
            101,
            output
        );
        if (checkIfListExistsResult) {
            for (const field of fields) {
            await addFieldToListIfNotExist(
                props.spfi,
                listTitle,
                field,
                output
            );

            await addFieldToListIfNotExist(
                props.spfi,
                listTitle,
                field.internalName,
                output
            );
            }
        }


    }

    return (
        {outputCollection.map((output) => (
            <MessageBarWrapper key={getGUID()}>{output}</MessageBarWrapper>
        ))}
    )