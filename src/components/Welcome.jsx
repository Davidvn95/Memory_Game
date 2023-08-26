import { useFormik } from 'formik'
import * as Yup from 'yup'

export function Welcome({ setPlayersNames }) {

    const formik = useFormik({
        initialValues: {
            player1: "",
            player2: "",
        },
        validationSchema: Yup.object({
            player1: Yup.string()
                .required("El nombre es Obligatorio")
                .min(3, "Debe tener al menos 3 caracteres")
                .max(12, "Debe tener máximo 12 caracteres"),
            player2: Yup.string()
                .required("El nombre es Obligatorio")
                .min(3, "Debe tener al menos 3 caracteres")
                .max(12, "Debe tener máximo 12 caracteres"),
        }),
        onSubmit: (values) => {
            setPlayersNames(values);
        },
    });
    return (
        <div className="absolute top-0 w-screen h-screen bg-slate-800/20 grid place-items-center z-30">
            <div className="flex flex-col justify-center items-center bg-yellow-200 p-6 rounded-3xl lg:-mb-9">
                <span className="text-2xl lg:text-4xl">{"Player's Names"}</span>
                <form
                    action=""
                    className="flex flex-col gap-9 lg:gap-12 mt-4 lg:mt-16"
                    onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-1 lg:gap-4 m-auto relative items-center lg:flex-row">
                        <label
                            htmlFor="player1"
                            className="text-xl lg:text-3xl text-orange-400">
                            Player 1
                        </label>
                        <input
                            id="player1"
                            name="player1"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.player1}
                            className="w-60 h-10 lg:w-96 lg:h-14 rounded-xl bg-yellow-200 text-lg lg:text-2xl p-4 border-4 border-emerald-900"
                        />
                        <span className="text-orange-500 text-sm lg:text-lg absolute -bottom-6 lg:-bottom-8 lg:right-44">
                            {formik.errors.player1 && formik.touched.player1
                                ? formik.errors.player1
                                : ''}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-4 m-auto relative items-center lg:flex-row">
                        <label
                            htmlFor="player2"
                            className="text-xl lg:text-3xl text-orange-400">
                            Player 2
                        </label>
                        <input
                            id="player2"
                            name="player2"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.player2}
                            className="w-60 h-10 lg:w-96 lg:h-14 rounded-xl bg-yellow-200 text-lg lg:text-2xl p-4 border-4 border-emerald-900"
                        />
                        <span className="text-orange-500 text-sm lg:text-lg absolute -bottom-6 lg:-bottom-8 lg:right-44">
                            {formik.errors.player2 && formik.touched.player2
                                ? formik.errors.player2
                                : ''}
                        </span>
                    </div>
                    <button
                        className="border-2 bg-orange-300 border-black rounded-xl lg:p-2 px-4 text-2xl lg:text-3xl w-fit m-auto"
                        type="submit">
                        Play
                    </button>
                </form>
            </div>
        </div>
    )
}