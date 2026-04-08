
/**
 * Wrapper para capturar errores en métodos asincrónicos
 * y desviarlos al manejador global de errores (error-handling middleware)
 */
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
