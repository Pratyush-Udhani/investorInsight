import { api } from '~/utils/api'
import { CategoryEnum } from '~/utils/categories';
import { Scatterplot } from './components/scatterplot';

export default function Home() {
    const data = api.router.getAppsByCategory.useQuery(CategoryEnum.GAME)
    console.log(data.data)
    return (
        <div className="w-full h-full flex justify-center">
        </div>
    );
}

