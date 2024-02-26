<script setup>
import {NLayout, NLayoutHeader, NMenu} from 'naive-ui'
import {h} from "vue";
import {RouterLink} from "vue-router";
import {generateProps} from "@/utils/generate.js";
import {HOME} from "@/router/RouterValue.js";
import {Home} from "@vicons/fa";
import {expandIcon, renderIcon} from "@/utils/IconGenerator.js";

const menuStyle = `
   font-size: 1.1rem;
`;

const menuOptions = [
   {
      label: () =>
         h(
            RouterLink,
            generateProps(HOME.name),
            {default: () => '首页'}
         ),
      key: 'm-debit',
      icon: renderIcon(Home)
   }, {
      label: () =>
         h(
            RouterLink,
            generateProps(HOME.name),
            {default: () => '首页'}
         ),
      key: 'm-debit',
      icon: renderIcon(Home)
   }, {
      label: () =>
         h(
            RouterLink,
            generateProps(HOME.name),
            {default: () => '首页'}
         ),
      key: 'm-debit',
      icon: renderIcon(Home)
   },
]
</script>

<template>
   <n-layout style="height: 100vh;">
      <n-layout-header>
         <n-menu
            :collapsed-icon-size="16"
            mode="horizontal"
            :expand-icon="expandIcon"
            :options="menuOptions"
            :style="menuStyle"
         />
      </n-layout-header>
      <n-layout content-style="padding: 8px;" position="absolute" :native-scrollbar="false"
                style="top: 3em; bottom: 0; background-color: #00bd7e">
         <n-scrollbar>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, aliquam asperiores atque debitis
               ducimus et fugit illo, iste iure natus nisi odit quam quasi similique tempore vel voluptatibus
               voluptatum. Quidem.
            </div>
            <div>Adipisci aliquid aspernatur consequatur cum cumque dicta facere hic in, ipsam itaque iure iusto
               laudantium maxime minus molestias, nesciunt obcaecati pariatur possimus quam quisquam ratione, sunt
               tempora temporibus vitae voluptate.
            </div>
            <div>Aliquam, aperiam deserunt dignissimos distinctio eligendi fuga hic illum, incidunt magnam
               praesentium quasi quibusdam sapiente veniam! A accusamus blanditiis ducimus earum eum hic ipsa,
               laboriosam, porro qui rerum unde vitae!
            </div>
            <div>Eaque facere fugit laboriosam laudantium, nisi omnis saepe ut? Accusamus ad animi blanditiis
               doloribus dolorum harum, illum maxime molestiae molestias nulla omnis praesentium, provident quaerat
               quam repellendus sed tempore tenetur.
            </div>
            <div>Accusantium adipisci amet architecto consectetur, deleniti dolorem eligendi eos et facilis hic
               incidunt ipsum necessitatibus neque perferendis porro provident, quaerat quibusdam quod repellendus
               repudiandae tempore temporibus tenetur ullam velit voluptatum.
            </div>
            <div>Accusantium adipisci corporis doloribus eaque earum eveniet ex, facere ipsa iste laudantium minima
               natus odio qui ut voluptatem! Ab eaque eos exercitationem explicabo itaque natus necessitatibus quasi
               reiciendis tempora temporibus.
            </div>
            <div>Eos impedit nihil voluptates? Adipisci aperiam dicta laborum nemo neque quibusdam ut vel veritatis
               vero. A amet commodi corporis culpa earum, harum maiores maxime minus, odio perferendis sequi
               voluptate voluptatum?
            </div>
            <div>Ab adipisci consequatur esse, et eveniet ipsa ipsam iure laboriosam minima modi nihil nobis pariatur
               perspiciatis quam quas quidem quis, quisquam quos sequi sit soluta sunt vel, velit voluptate
               voluptatibus.
            </div>
            <div>Ab accusantium distinctio dolore doloremque doloribus dolorum ea eaque molestias, non obcaecati
               odit, optio praesentium tempore unde voluptas! Accusantium alias aut culpa deserunt fugit inventore
               molestias praesentium quaerat, quos temporibus.
            </div>
            <div>Aliquid deserunt doloribus dolorum, error eum exercitationem fuga itaque maiores minus non nostrum
               repellendus repudiandae sequi sit totam vitae voluptate voluptatem. Distinctio ipsam magnam magni
               molestias numquam placeat sint tempore.
            </div>
            <div>Adipisci consectetur corporis dolore eos eum ipsa labore molestiae neque nulla odio, quam quidem
               reprehenderit sapiente veniam vero. Delectus eaque eligendi libero magni maiores minima nulla officiis
               pariatur placeat vel!
            </div>
            <div>Adipisci assumenda beatae consequatur dicta dolorem doloremque dolores ducimus ea incidunt iure
               nobis non odio officia porro quia reiciendis sint soluta tenetur vel, voluptatum? Architecto debitis
               minus rem voluptatem voluptatum?
            </div>
            <div>Ex magnam natus quasi rerum! Amet animi consectetur culpa cum dolorum ex ipsam itaque minus,
               nesciunt nulla odio quae quia quibusdam quidem reprehenderit suscipit unde! Animi eos nisi ratione
               voluptate.
            </div>
            <div>Accusantium ea eveniet pariatur quod totam. Aspernatur corporis delectus eius enim esse, facilis
               iure laboriosam laborum magnam maiores molestias numquam pariatur quaerat quam quia quisquam quod,
               reiciendis sint sunt veritatis.
            </div>
            <div>Aliquam distinctio dolores, eos esse fugit illo nihil nisi perferendis perspiciatis tempore.
               Doloribus et laboriosam nam natus, numquam voluptatem voluptates? Adipisci excepturi ipsam iure
               molestias necessitatibus reprehenderit ullam velit veniam.
            </div>
            <div>Error impedit iste itaque molestiae nulla odit optio quia recusandae repudiandae veniam. Distinctio
               dolorum eaque eius in maxime nobis sunt voluptatibus. Assumenda dolore dolorum fuga minima odit,
               quidem temporibus veniam.
            </div>
            <div>Cumque esse iusto porro! Aliquid aperiam, architecto aspernatur debitis delectus dolores error
               explicabo facilis itaque iure maiores modi officia quae repellat repellendus sequi voluptatem!
               Accusantium aliquam cum ipsum minus sit?
            </div>
            <div>Ab alias aspernatur aut corporis dicta eaque facere illum labore magni neque obcaecati, quibusdam
               sit totam! Corporis, id, natus. Ducimus nam nesciunt quibusdam. A exercitationem fugiat hic odit sit
               temporibus.
            </div>
            <div>Ad alias cumque debitis eius eos molestiae, nobis veritatis! Ad earum maiores officiis repellendus
               suscipit voluptatum? Deserunt doloremque fugit laudantium perferendis ut? Aliquam culpa, eius est
               explicabo ipsam vero voluptatem?
            </div>
            <div>Autem cum iure provident quaerat quidem voluptatum. Adipisci, aliquid assumenda beatae cumque
               cupiditate eius enim illo impedit ipsum iste iusto odit omnis quam quod soluta, suscipit tempore
               tenetur! Assumenda, itaque.
            </div>
            <div>A beatae commodi deleniti deserunt dolore ducimus ea earum eius expedita magnam officia perferendis,
               quis reprehenderit repudiandae temporibus, totam vel veritatis voluptatum? Aut ipsam omnis quasi sequi
               sint totam vitae.
            </div>
            <div>A ad, asperiores at atque beatae commodi cum debitis doloribus ea eaque error esse excepturi harum
               inventore necessitatibus nemo nihil, nobis numquam obcaecati possimus, quaerat quos velit veritatis
               voluptas voluptatum.
            </div>
            <div>A adipisci aliquam amet aperiam autem culpa deleniti eaque eius et exercitationem hic impedit
               inventore magni minus modi natus odit officia perferendis provident quas, repellat temporibus
               voluptate voluptatibus. Expedita, quod!
            </div>
            <div>A animi commodi cum deserunt doloremque eius est facilis fugiat hic incidunt, ipsam libero maxime
               mollitia, pariatur provident, quae ratione sed similique vitae voluptates? Corporis explicabo in non
               quisquam recusandae?
            </div>
            <div>A consequatur consequuntur culpa deserunt dignissimos dolor ducimus eaque enim fugiat ipsa modi
               molestiae nam natus nulla officiis quam repellendus, repudiandae similique, sit, tempora temporibus
               ullam ut veniam? Accusamus, dignissimos?
            </div>
            <div>Consequuntur dolorem enim et fugiat illum, minima nobis omnis, possimus quidem reprehenderit
               repudiandae sequi sit sunt! A delectus, eaque esse ex expedita laudantium magnam, maiores reiciendis,
               reprehenderit sint veritatis voluptatibus.
            </div>
            <div>A, accusantium adipisci at beatae consectetur consequatur dignissimos distinctio dolorem eaque eos
               esse eveniet fugiat hic labore molestias mollitia quam reiciendis reprehenderit sit suscipit
               temporibus unde veritatis, vero, voluptates voluptatibus.
            </div>
            <div>Aliquam consequatur deleniti dolor iure quasi sapiente vitae. Ad adipisci aliquam architecto
               blanditiis commodi, dolore error eveniet illum impedit magnam porro possimus quas rem saepe, sed
               similique soluta totam, veritatis.
            </div>
            <div>Amet asperiores consequatur consequuntur delectus deserunt ea earum enim expedita fugiat id in ipsum
               iste laudantium magni nulla numquam odit officia placeat, provident quae quis sapiente totam. Dolorum,
               expedita, quia?
            </div>
            <div>At aut cumque doloribus eligendi eveniet, explicabo in modi quidem reprehenderit ut. A aliquam
               beatae cum eos ipsum maiores maxime minima modi molestiae natus odio, quisquam repellat saepe tempora,
               veritatis?
            </div>

         </n-scrollbar>
      </n-layout>

   </n-layout>
</template>

<style scoped>
.n-layout-header {
   padding: calc((3em - 42px) / 2) 0;
   height: 3em;
}
</style>