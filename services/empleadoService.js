const Empleado = require('../models/empleado');

exports.getAllEmpleados = async () => {
    try {
        const empleados = await Empleado.find({ Rol: { $eq: "empleado" } })

        if (!empleados) {
            throw new Error("No hay empleados registrados");
        }

        return empleados;

    } catch (error) {
        res.status(500).json({ message: `Error: ${erro.message}` });
    }
};

exports.getEmpleadoRFC = async (empleadoData) => {
    try {
        const empleado = await Empleado.find({ RFC: { $eq: empleadoData.RFC } })

        if (!empleado) {
            throw new Error("No hay un empleado registrado con ese RFC");
        }

        return empleado;

    } catch (error) {
        res.status(500).json({ message: `Error: ${erro.message}` });
    }
};

exports.updateEmpleado = async (empleadoData) => {
    try {
        const empleado = await Empleado.find({ RFC: { $eq: empleadoData.RFC } })

        if (!empleado) {
            throw new Error("No hay un empleado registrado con ese RFC");
        }

        return empleado;

    } catch (error) {
        res.status(500).json({ message: `Error: ${erro.message}` });
    }
};

exports.deleteEmpleado = async (empleadoData) => {

    try {
        const empleado = await Empleado.find({ RFC: { $eq: empleadoData.RFC } })

        if (!empleado) {
            throw new Error("No hay un empleado registrado con ese RFC");
        }

        return empleado;

    } catch (error) {
        res.status(500).json({ message: `Error: ${erro.message}` });
    }
};
