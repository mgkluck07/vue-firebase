export default {
    namespaced: true,
    state: {
        obras: [
            {
                oid: 'hamilton',
                titulo: 'Hamilton',
                portada: require('@/assets/obras/hamilton.png'),
                presentaciones: [
                    {
                        pid: 'hamilton-teatro-super-opera-2019-02-20-18-00',
                        obra: {
                            oid: 'hamilton',
                            titulo: 'Hamilton'
                        },
                        teatro: {
                            tid: 'teatro-super-opera',
                            nombre: 'Teatro Super Opera'
                        },
                        fecha: '2019-02-20-18-00'
                    }
                ]
            },
            {
                oid: 'el-rey-leon',
                titulo: 'El Rey Leon',
                portada: require('@/assets/obras/el-rey-leon.png'),
                presentaciones: [{
                    pid: 'el-rey-leon-teatro-super-opera-2019-02-20-18-00',
                    obra: {
                        oid: 'el-rey-leon',
                        titulo: 'El Rey Leon'
                    },
                    teatro: {
                        tid: 'teatro-super-opera',
                        nombre: 'Teatro Super Opera'
                    },
                    fecha: '2019-02-20-18-00'
                }]
            },
            {
                oid: 'frozen',
                titulo: 'Frozen',
                portada: require('@/assets/obras/frozen.png'),
                presentaciones: [{
                    pid: 'frozen-teatro-super-opera-2019-02-20-18-00',
                    obra: {
                        oid: 'frozen',
                        titulo: 'Frozen'
                    },
                    teatro: {
                        tid: 'teatro-super-opera',
                        nombre: 'Teatro Super Opera'
                    },
                    fecha: '2019-02-20-18-00'
                }]
            },
            {
                oid: 'anastasia',
                titulo: 'Anastasia',
                portada: require('@/assets/obras/anastasia.png'),
                presentaciones: [{
                    pid: 'anastasia-teatro-super-opera-2019-02-20-18-00',
                    obra: {
                        oid: 'anastasia',
                        titulo: 'Anastasia'
                    },
                    teatro: {
                        tid: 'teatro-super-opera',
                        nombre: 'Teatro Super Opera'
                    },
                    fecha: '2019-02-20-18-00'
                }]
            }
        ]
    }
}