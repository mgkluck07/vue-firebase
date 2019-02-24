<template>
    <div>
        <div class="seccion">
            <transition name="scale-y" mode="out-in">
                <div v-if="!pago && boletos == 0" :key="1" class="mensaje informacion">
                    Selecciona al menos un boleto
                </div>
                <div v-else-if="!pago && boletos > 0" :key="2" class="mensaje advertencia">
                    Recuerda completar tu compra
                </div>
                <div v-else :key="3" class="mensaje exito">
                    Bienvenido!
                </div>
            </transition>
            <div class="atributo">
                <span>Asientos</span>
            </div>
            <div class="atributo">
                <transition-group name="superior">
                    <button @click="seleccionar(asiento, index)" v-for="(asiento,index) in asientos" :key="asiento">{{asiento}}</button>
                </transition-group>
            </div>
        </div>
        <div class="seccion">
            <div class="atributo">
                <span>Boletos</span>
            </div>
            <div class="atributo">
                <span class="boletos">{{ boletos }}</span>
            </div>
            <div v-show="boletos > 0" class="atributo">
                <span>Total: ${{total}}</span>
            </div>            
            <div class="atributo">
                <transition-group name="inferior">
                    <button class="seleccion" @click="remover(asiento, index)" v-for="(asiento,index) in seleccionados" :key="asiento">{{asiento}}</button>
                </transition-group>
            </div>
            <div v-if="!pago && boletos > 0" class="atributo">
                <button @click="pago = true">Pagar</button>
            </div>
            <div v-if="pago > 0" class="atributo">
                <button @click="reiniciar">Reiniciar</button>
            </div>
            <div class="atributo">
                <span class="comision" :class="claseComision">${{ comision }}</span>
            </div>
        </div>
       <transition name="fade">
            <Ticket v-if="pago">
                <div slot="obra">
                    <span>El Rey León</span>
                </div>
                <div slot="horario">
                    <span>2019-05-24 22:00</span>
                </div>
                <span slot="asientos">
                    <span class="asiento" v-for="(asiento,index) in seleccionados" :key="index">
                        {{asiento}}
                    </span>
                </span>
                <div slot="total">
                    ${{ total }}
                </div>
            </Ticket>
       </transition>
    </div>
</template>

<script>
import Ticket from '@/components/Ticket';
export default {
    components: { Ticket },
    data() {
        return {
            comision: 0,
            claseComision: 'neutro',
            pago: false,
            asientos: [
                'A1','A2','A3','A4','A5',
                'B1','B2','B3','B4','B5'
            ],
            seleccionados: []
        }
    },
    computed: {
        total() {
            return this.boletos * 100;
        },
        boletos(){
            return this.seleccionados.length;
        }
    },
    methods: {
        actualizarCantidad(cantidad){
            this.boletos += cantidad;
            if(this.boletos >10){
                this.boletos = 10;
            } else if(this.boletos <0 ) {
                this.boletos = 0;
            }
        },
        reiniciar(){
            this.pago = false;
            this.asientos.push(...this.seleccionados);
            this.asientos.sort();
            this.seleccionados = [];
            this.comision = 0;
        },
        seleccionar(asiento, index){
            if(this.pago){return}
            this.asientos.splice(index, 1);
            this.seleccionados.push(asiento);
            this.seleccionados.sort();
        },
        remover(asiento, index){
            if(this.pago){return}
            this.seleccionados.splice(index, 1);
            this.asientos.push(asiento);
            this.asientos.sort();
        }
    },
    watch: {
        boletos(newValue, oldValue){
            if(newValue > oldValue){
                this.comision += 10;
            }else {
                this.comision -= 15;
            }

            if(this.comision < 0){
                this.comision = 0;
            }
        },
        comision(newValue, oldValue){
            if(this.comision == 0){
                this.claseComision = 'neutro';
            }else if(newValue > oldValue){
                this.claseComision = 'incremento';
            }else{
                this.claseComision = 'decremento';
            }
        }
    },
}
</script>

<style>
.asiento{
    font-size: 1.8rem;
    padding: 3px;
    margin: 3px;
    border: 1px solid black;
}
.boletos{
    font-size: 4rem;
    font-weight: bold;
}
.comision {
    font-size: 3.2rem;
}
.neutro{
    color: #000;
}
.incremento{
    color: green;
}
.decremento{
    color: red;
}
.mensaje{
    border-radius: 5px;
    border-width: 4px;
    border-style: dashed;
    padding: 10px;
    font-size: 2.1rem;
    font-weight: bold;
}

.informacion{
    border-color: blue;
}
.advertencia{
    border-color: orange;
}
.exito{
    border-color: green;
}
.seleccion{
    background-color: rgb(67, 133, 67);
}

.scale-y-enter {
    opacity: o;
}
.scale-y-enter-active {
    transition: opacity 0.3s ease-out;
    animation: mensaje-in 0.3s ease-out forwards;
}
.scale-y-leave-active {
    transition: opacity 0.2s ease-out;
    animation: mensaje-out 0.2s ease-out forwards;
    opacity: 0;
}

@keyframes mensaje-in {
    0%{
        transform: scaleY(0)
    }
    70%{
        transform: scaleY(1.2)
    }
    90%{
        transform: scaleY(0.9)
    }
    100%{
        transform: scaleY(1)
    }
}

@keyframes mensaje-out {
    from{
        transform: scaleY(1)
    }
    to{
        transform: scaleY(0)
    }
}

.superior-enter {
    opacity: o;
}
.superior-enter-active {
    transition: opacity 0.3s ease-out;
    animation: superior-in 0.3s ease-out forwards;
}
.superior-leave-active {
    transition: opacity 0.2s ease-out;
    animation: superior-out 0.2s ease-out forwards;
    opacity: 0;
}

@keyframes superior-in {
    0%{
        transform: translateY(30px)
    }
    70%{
        transform: translateY(-10px)
    }
    90%{
        transform: translateY(5px)
    }
    100%{
        transform: translateY(0)
    }
}

@keyframes superior-out {
    from{
        transform: translateY(0)
    }
    to{
        transform: translateY(30px)
    }
}

.inferior-enter {
    opacity: o;
}
.inferior-enter-active {
    transition: opacity 0.3s ease-out;
    animation: inferior-in 0.3s ease-out forwards;
}
.inferior-leave-active {
    transition: opacity 0.2s ease-out;
    animation: inferior-out 0.2s ease-out forwards;
    opacity: 0;
}

@keyframes inferior-in {
    0%{
        transform: translateY(-30px)
    }
    70%{
        transform: translateY(10px)
    }
    90%{
        transform: translateY(-5px)
    }
    100%{
        transform: translateY(0)
    }
}

@keyframes inferior-out {
    from{
        transform: translateY(0)
    }
    to{
        transform: translateY(-30px)
    }
}
</style>
