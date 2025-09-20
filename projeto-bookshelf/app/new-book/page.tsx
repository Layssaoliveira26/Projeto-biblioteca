import GoBackButton from "@/components/ui/custom-components/goBackButton";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack, IoMdImages } from "react-icons/io";
import { opcoesLeitura, options } from '@/lib/options';
import { StarRating } from "@/components/ui/custom-components/star";

export default function NewBookPage() {
  return (
    <div className="w-full h-full bg-[#FFFFFF] md:p-8 lg:p-12 ">
      {/*Div como repartição um, com cor diferenciada*/}
      <div className='h-1/3 w-full bg-[#f9f8f6] p-4'>
        <GoBackButton />
        {/* Área do preview da capa do livro */}
        <div className='flex justify-center justify-items-center justify-content-center  '>
          <div className='w-3/8 bg-[#FFFEFE] p-4 mt-4 mb-2 justify-items-center  text-center border border-dashed border-gray-400 rounded-md'>
            <IoMdImages className='h-8 w-8 text-gray-400'/>
            <span className='text-xs text-gray-500'>Preview da capa <br/> do livro</span>
        </div>
      </div> 
      </div>
      {/* Área do progresso de leitura */}
      <div className='ml-5 mr-5 p-2 border border-gray-200 rounded-md border-1'>
        <p className='ml-2'>Progresso</p>
        <hr  className='h-1.5 bg-black m-2'/>
      </div>
      {/* Área dos inputs de preenchimento dos dados do livro */}
      <div className='m-4'>
        <h5 className='text-center mb-2 font-bold'>Informações da Obra</h5>
        <div className='flex flex-col'>
          <label className='ml-5'>Título</label>
          <input type="text" placeholder='Ex.: Dom Casmurro' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5'/>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Autor</label>
          <input type="text" placeholder='Ex.: Machado de Assis' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5'/>
        </div>
        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Total de Páginas</label>
            <input type="text" placeholder='Ex.: 150' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-3 sm: pl-1.5'/>
          </div>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-1'>Página Atual</label>
            <input type="text" placeholder='Ex.: 10' className='border border-gray-300 rounded rouded-sm h-8  mr-5 sm: pl-1.5'/>
          </div>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>ISBN</label>
          <input type="number" placeholder='Ex.: 9788533302273' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 '/>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>URL da capa</label>
          <input type="text" placeholder='Ex.: https://...' className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5'/>
        </div>
        <div className='flex'>
          <div className='flex flex-col mt-2 w-1/2'>
            <label className='ml-5'>Gênero</label>
            <select name="" className='border border-gray-300 rounded rouded-sm h-8 ml-5 mr-5 pl-1.5 '>
              {options.map((optione, id) => (
                <option key={id} value={optione.genero}>{optione.genero}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col mt-2'>
            <label className='ml-1'>Status</label>
            <select name="" className='border border-gray-300 rounded rouded-sm h-8 mr-5 sm: pl-1.5 w-full'>
              {opcoesLeitura.map((opcaoLeitura, id) => (
                <option key={id} value={opcaoLeitura.status}>{opcaoLeitura.status}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='mt-3 ml-5'>
            <label className='ml-1'>Avaliação</label>
            <div className='flex items-center'>
              <StarRating rating={0} />
              <Button className='bg-[#fffff] text-gray-700 border text-xs ml-5' >
                Limpar
              </Button>
              <span className='ml-5 text-gray-700 text-sm'>Sem avaliação</span>
            </div>
        </div>
        <div className='flex flex-col mt-2'>
          <label className='ml-5'>Notas</label>
          <textarea className='border border-gray-300 rounded rouded-sm ml-5 mr-5 pl-1.5' placeholder='Anotações sobre o livro'></textarea>
        </div>
        <div className='flex justify-center mt-4 mb-4'>
          <Button className='bg-[#252525] text-white font-semibold border text-xs ml-5 justify-center' >
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}
