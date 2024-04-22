export type formMessage = { msg: string, type: "success" | "warning" } | false;
export type formField = {
    name: string, prop: string, extra?: {
        type: "select",
        label: string,
        options: { value: string, name: string }[]
    } | {
        type: "file",
        mime_type: string
    }
}

function FormContainer(props: { children: any }) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className="">
                    {props.children}
                </form>
            </div>
        </div>
    )
}

export function Form(props: { fields: formField[], getter: any, setter: any, submitHander: (event: any) => void, message: formMessage, disabled?: boolean }) {
    console.log("Make form")
    return (
        <>
            <FormContainer>
                {
                    props.fields.map((field) => {
                        switch (field.extra?.type) {
                            case "select":
                                return (
                                    <div className="m-2 form-group" key={field.name}>
                                        <label className="m-1" htmlFor={field.name}>{field.name}</label>
                                        <select className="form-control" id={field.name} value={props.getter[field.prop]} onChange={(e) => { props.setter({ ...props.getter, [field.prop]: e.target.value }) }}>
                                            <option value="">Select a {field.extra.label}</option>
                                            {
                                                field.extra.options.map((option) => {
                                                    return <option key={option.value} value={option.value}>{option.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                )
                            case "file":
                                return (
                                    <div className="m-2 form-group" key={field.name}>
                                        <label className="m-1" htmlFor={field.name}>{field.name}</label>
                                        <input type="file" className="form-control" id={field.name} placeholder={field.name} accept={field.extra.mime_type}
                                            onChange={(e) => { props.setter({ ...props.getter, [field.prop]: e.target.files ? e.target.files[0] : false }) }} />
                                    </div>
                                )
                            default:
                                return (
                                    <div className="m-2 form-group" key={field.name}>
                                        <label className="m-1" htmlFor={field.name}>{field.name}</label>
                                        <input type={field.prop === "password" ? "password" : "text"} className="form-control" id={field.name} placeholder={field.name} value={props.getter[field.prop]} onChange={(e) => { props.setter({ ...props.getter, [field.prop]: e.target.value }) }} />
                                    </div>
                                )
                        }
                    })
                }
                <button disabled={!!props.disabled} onClick={props.submitHander} type="submit" className="btn btn-primary m-2">Submit</button>

                <div className="row justify-content-center">
                    {props.message && <div className={"alert " + (props.message.type === "success" ? "alert-success" : "alert-danger")}>{props.message.msg}</div>}
                </div>
            </FormContainer>
        </>
    )
}